<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>{{ $config->name }}</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link rel="stylesheet" href="/css/server_app.css">
    <script src="https://kit.fontawesome.com/aef7c3ed6b.js" crossorigin="anonymous"></script>

{{--    <link rel="stylesheet" media="" href="/css/default.css" class="theme">--}}
    <!-- <link rel="stylesheet" media="(prefers-color-scheme: light)" href="./DABI_files/light.css" class="theme">
    <link rel="stylesheet" media="(prefers-color-scheme: dark)" href="./DABI_files/dark.css" class="theme">
    <link rel="stylesheet" media="(prefers-contrast: more)" href="./DABI_files/light-highcontrast.css" class="theme">
    <link rel="stylesheet" media="(prefers-color-scheme: dark) and (prefers-contrast: more)" href="./DABI_files/dark-highcontrast.css" class="theme">
    <link rel="stylesheet" media="" href="./DABI_files/light(1).css" class="theme">
    <link rel="stylesheet" media="" href="./DABI_files/dark(1).css" class="theme">
    <link rel="stylesheet" media="" href="./DABI_files/light-highcontrast(1).css" class="theme">
    <link rel="stylesheet" media="" href="./DABI_files/dark-highcontrast(1).css" class="theme">
    <link rel="stylesheet" media="" href="./DABI_files/opendyslexic.css" class="theme"> -->
    <meta name="robots" content="noindex, nofollow">

    <style>


    </style>
    <style>
        .app-header {
            z-index: 1 !important;
        }
        /*correct media size */
        @media (min-width: 800px) {
            .sidebar {
                z-index: 1 !important;
            }
        }
    </style>
</head>
<body id="q" class="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
{{--<header role="banner" id="header" style="display:flex">--}}
{{--    <div class="header-left">--}}
{{--        <!--				Xu ly redirect cho icon-->--}}
{{--        <a href="/" id="cudidi">--}}
{{--            <div class="logo logo-icon"></div>--}}
{{--        </a>--}}


{{--        <nav id="appnavigation"></nav>--}}
{{--    </div>--}}

{{--    <div class="header-right">--}}
{{--        <div id="contactsmenu">--}}
{{--            <div id="contactsmenu-menu" class="menu" aria-label="Trình đơn liên hệ"></div>--}}
{{--        </div>--}}
{{--        <div id="settings">--}}
{{--            <div id="expanddiv" tabindex="0" role="button" class="menutoggle" aria-label="Mở danh mục cài đặt" aria-haspopup="true" aria-controls="expanddiv" aria-expanded="false">--}}

{{--            </div>--}}
{{--            <div id="expanddiv"></div>--}}
{{--            <!-- <nav class="settings-menu menu" id="expanddiv" style="display:none;"> -->--}}

{{--        </div>--}}
{{--    </div>--}}
{{--</header>--}}
<link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
/>
<div id="dv_policy_index" class="ql-editor">{!! isset($config) ? $config->value : '' !!}</div>

</body>
</html>
