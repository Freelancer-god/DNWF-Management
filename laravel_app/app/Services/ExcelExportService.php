<?php


namespace App\Services;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

class ExcelExportService
{
    public function export(array $columns, array $headers, array $data, $file_name)
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Set headers
        foreach ($headers as $columnIndex => $header) {
            $cell = $this->getColumnLetter($columnIndex + 1) . '1';
            $sheet->setCellValue($cell, $header);

            $sheet->getStyle($cell)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB(Color::COLOR_GREEN);
        }

        // Set data
        foreach ($data as $rowIndex => $row) {
            foreach ($columns as $columnIndex => $column) {
                $sheet->setCellValue(
                    $this->getColumnLetter($columnIndex + 1) . ($rowIndex + 2),
                    $row[$column]
                );
            }
        }
        $highestRow = count($data) + 1;
        $highestColumn = $this->getColumnLetter(count($columns));
        $cellRange = 'A1:' . $highestColumn . $highestRow;

        $sheet->getStyle($cellRange)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

        foreach (range('A', $highestColumn) as $columnID) {
            $sheet->getColumnDimension($columnID)->setAutoSize(true);
        }

        // Write file to a temporary location
        $writer = new Xlsx($spreadsheet);
        $tempFile = "{$file_name}_" . time() . '.xlsx';
        $writer->save($tempFile);

        return $tempFile;
    }

    private function getColumnLetter($columnNumber)
    {
        $columnLetter = '';
        while ($columnNumber > 0) {
            $columnNumber--;
            $columnLetter = chr(65 + ($columnNumber % 26)) . $columnLetter;
            $columnNumber = (int)($columnNumber / 26);
        }
        return $columnLetter;
    }
}

