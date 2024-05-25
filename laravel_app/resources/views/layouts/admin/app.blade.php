<!DOCTYPE html>
<html lang="@yield('lang')">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/server_app.css">
    <script src="https://kit.fontawesome.com/aef7c3ed6b.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" media="" href="/css/default.css" class="theme">
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
    <!-- Fonts -->
    @yield('font')
    <!-- Styles -->
    <style>


    </style>
    <!-- Styles -->
    @viteReactRefresh
    @vite('resources/js/src/main.jsx')
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
<header role="banner" id="header" style="display:flex">
			<div class="header-left">
<!--				Xu ly redirect cho icon-->
				<a href="/" id="cudidi">
					<div class="logo logo-icon"></div>
				</a>


				<nav id="appnavigation"></nav>
			</div>

			<div class="header-right">
									<div id="contactsmenu">
						<div id="contactsmenu-menu" class="menu" aria-label="Trình đơn liên hệ"></div>
					</div>
								<div id="settings">
					<div id="expanddiv" tabindex="0" role="button" class="menutoggle" aria-label="Mở danh mục cài đặt" aria-haspopup="true" aria-controls="expanddiv" aria-expanded="false">

					</div>
					<div id="expanddiv"></div>
					<!-- <nav class="settings-menu menu" id="expanddiv" style="display:none;"> -->

				</div>
			</div>
		</header>
        <main id="content" class="app-championships">
            <div id="root"></div>
		</main>
        @yield('content')




        <input type="hidden" id="myToken" name="myToken" value="{{ session('myToken') }}">
        <input type="hidden" id="myUser" name="myUser" value="{{ session('myUser') }}">
        <input type="hidden" id="myPermission" name="myPermission" value="{{ session('myPermission') }}">

</body>
</html>
