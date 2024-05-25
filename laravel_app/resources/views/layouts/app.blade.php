<!DOCTYPE html>
<html lang="@yield('lang')">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        @yield('meta')

        <title>@yield('title')</title>

        <!-- Fonts -->
        @yield('font')
        <!-- Styles -->
        <style>
            @yield('css')
        </style>
        <!-- Styles -->
        @viteReactRefresh
        @vite('resources/js/app.jsx')

    </head>
    <body>
        <div>
            @yield('content')
        </div>
    </body>
    @yield('js')
</html>
