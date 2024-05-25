<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\ParameterBag;

class HandleFormData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->method() == 'GET') {
            return $next($request);
        }
        if (
            preg_match('/multipart\/form-data/', $request->headers->get('Content-Type')) or
            preg_match('/multipart\/form-data/', $request->headers->get('content-type'))
        ) {
            $parameters = $this->decode();
            $request->merge($parameters['inputs']);
            $request->files->add($parameters['files']);
        }
        return $next($request);
    }
    public function decode()
    {
        $this->files = [];
        $this->data = [];
        // Fetch content and determine boundary
        $rawData = file_get_contents('php://input');
        $boundary = substr($rawData, 0, strpos($rawData, "\r\n"));
        if(empty($boundary)){
            parse_str($rawData,$data);
            return [
                "inputs" => $data,
                "files" => $this->files
            ];
        }
        // Fetch and process each part
        $parts = array_slice(explode($boundary, $rawData), 1);
        foreach ($parts as $part) {
            // If this is the last part, break
            if ($part == "--\r\n") {
                break;
            }
            // Separate content from headers
            $part = ltrim($part, "\r\n");
            list($rawHeaders, $content) = explode("\r\n\r\n", $part, 2);
            $content = substr($content, 0, strlen($content) - 2);
            // Parse the headers list
            $rawHeaders = explode("\r\n", $rawHeaders);
            $headers = [];
            foreach ($rawHeaders as $header) {
                list($name, $value) = explode(':', $header);
                $headers[strtolower($name)] = ltrim($value, ' ');
            }
            // Parse the Content-Disposition to get the field name, etc.
            if (isset($headers['content-disposition'])) {
                preg_match('/^form-data; *name="([^"]+)"(; *filename="([^"]+)")?/', $headers['content-disposition'], $matches);
                $fieldName = $matches[1];
                $fileName = (isset($matches[3]) ? $matches[3] : null);
                parse_str($fieldName, $fieldNameAsArray);
                // If we have a file, save it. Otherwise, save the data.
                if ($fileName !== null) {
                    Log::info(sys_get_temp_dir());
                    $localFileName = tempnam(sys_get_temp_dir(), 'sfy');
                    file_put_contents($localFileName, $content);
                    $fileData = [
                        'name' => $fileName,
                        'type' => $headers['content-type'],
                        'tmp_name' => $localFileName,
                        'error' => 0,
                        'size' => filesize($localFileName),
                    ];
                    $this->parseFieldName($this->files, array_keys($fieldNameAsArray)[0], array_values($fieldNameAsArray)[0], $fileData);
                    // register a shutdown function to cleanup the temporary file
                    register_shutdown_function(function () use($localFileName) {
                        unlink($localFileName);
                    });
                } else {
                    $this->parseFieldName($this->data, array_keys($fieldNameAsArray)[0], array_values($fieldNameAsArray)[0], $content);
                }
            }
        }
        $fields = new ParameterBag($this->data);
        return [
            "inputs" => $fields->all(),
            "files" => $this->files
        ];
    }
    public function parseFieldName(&$var, $fieldBaseName, $fieldNameAsArray, $content)
    {
        if (empty($fieldNameAsArray)) {
            $var[$fieldBaseName] = $content;
            return;
        }
        foreach ($fieldNameAsArray as $key => $value) {
            if (gettype($value) === 'string') {
                //  TODO: deal with nested arrays
                $var[$fieldBaseName][$key] = $content;
            }
        }
    }
}
