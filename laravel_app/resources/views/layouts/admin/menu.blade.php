@if(auth()->guard('web')->user()->hasPermission('view-employee')
    || auth()->guard('web')->user()->hasPermission('view-role'))
    <li class="nav-item nav-dropdown {{ Request::is('employees*') || Request::is('roles*') ? 'active' : '' }}">
        <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="nav-icon icon-cursor"></i>
            Người dùng
        </a>
        <ul class="nav-dropdown-items">
            @if(auth()->guard('web')->user()->hasPermission('view-employee'))
                <li class="nav-item {{ Request::is('employees*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('employees.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Quản lý</span>
                    </a>
                </li>
            @endif
            @if(auth()->guard('web')->user()->hasPermission('view-role'))
                <li class="nav-item {{ Request::is('roles*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('roles.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Vai trò</span>
                    </a>
                </li>
            @endif
        </ul>
    </li>
@endif
@if(auth()->guard('web')->user()->hasPermission('view-passenger')
    || auth()->guard('web')->user()->hasPermission('view-invoice')
    || auth()->guard('web')->user()->hasPermission('view-passenger-review'))
    <li class="nav-item nav-dropdown {{ Request::is('passengers*') || Request::is('invoices*') || Request::is('passengerReviews*') ? 'active' : '' }}">
        <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="nav-icon icon-cursor"></i>
            Hành khách
        </a>
        <ul class="nav-dropdown-items">
            @if(auth()->guard('web')->user()->hasPermission('view-passenger'))
                <li class="nav-item {{ Request::is('passengers*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('passengers.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Quản lý</span>
                    </a>
                </li>
            @endif
            @if(auth()->guard('web')->user()->hasPermission('view-invoice'))
                <li class="nav-item {{ Request::is('invoices*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('invoices.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Quản lý hóa đơn</span>
                    </a>
                </li>
            @endif
                @if(auth()->guard('web')->user()->hasPermission('view-invoice'))
                    <li class="nav-item {{ Request::is('passengerReviews*') ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('passenger_reviews.index', [], false) }}">
                            <i class="nav-icon"></i>
                            <span>Quản lý đánh giá</span>
                        </a>
                    </li>
                @endif
        </ul>
    </li>
@endif
@if(auth()->guard('web')->user()->hasPermission('view-driver')
    || auth()->guard('web')->user()->hasPermission('view-driver-form')
    || auth()->guard('web')->user()->hasPermission('view-trip-ticket')
    || auth()->guard('web')->user()->hasPermission('view-transfer-ticket')
    || auth()->guard('web')->user()->hasPermission('view-maintenance-ticket'))
    <li class="nav-item nav-dropdown {{ Request::is('drivers*') || Request::is('driverForms*') || Request::is('tripTickets*') || Request::is('transferTickets*') || Request::is('maintenanceTickets*') ? 'active' : '' }}">
        <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="nav-icon icon-cursor"></i>
            Tài xế
        </a>
        <ul class="nav-dropdown-items">
            @if(auth()->guard('web')->user()->hasPermission('view-driver'))
                <li class="nav-item {{ Request::is('drivers*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('drivers.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Quản lý</span>
                    </a>
                </li>
            @endif
            @if(auth()->guard('web')->user()->hasPermission('view-driver-form'))
                <li class="nav-item {{ Request::is('driverForms*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('driver_forms.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Quản lý xác minh</span>
                    </a>
                </li>
            @endif
            @if(auth()->guard('web')->user()->hasPermission('view-trip-ticket'))
                <li class="nav-item {{ Request::is('tripTickets*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('trip_tickets.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Quản lý chuyến</span>
                    </a>
                </li>
            @endif
{{--            @if(auth()->guard('web')->user()->hasPermission('view-transfer-ticket'))--}}
{{--                <li class="nav-item {{ Request::is('transferTickets*') ? 'active' : '' }}">--}}
{{--                    <a class="nav-link" href="{{ route('transfer_tickets.index') }}">--}}
{{--                        <i class="nav-icon"></i>--}}
{{--                        <span>Quản lý nạp điểm</span>--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--            @endif--}}
{{--            @if(auth()->guard('web')->user()->hasPermission('view-maintenance-ticket'))--}}
{{--                <li class="nav-item {{ Request::is('maintenanceTickets*') ? 'active' : '' }}">--}}
{{--                    <a class="nav-link" href="{{ route('maintenance_tickets.index') }}">--}}
{{--                        <i class="nav-icon"></i>--}}
{{--                        <span>Quản lý bảo dưỡng</span>--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--            @endif--}}
        </ul>
    </li>
@endif
@if(auth()->guard('web')->user()->hasPermission('view-trip'))
    <li class="nav-item {{ Request::is('trips*') ? 'active' : '' }}">
        <a class="nav-link" href="{{ route('trips.index', [], false) }}">
            <i class="nav-icon icon-cursor"></i>
            <span>Quản lý chuyến đi</span>
        </a>
    </li>
@endif
@if(auth()->guard('web')->user()->hasPermission('view-support-service-driver')
    || auth()->guard('web')->user()->hasPermission('view-support-service-passenger'))
    <li class="nav-item nav-dropdown {{ Request::is('supportServicePassengers*') || Request::is('supportServiceDrivers*') ? 'active' : '' }}">
        <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="nav-icon icon-cursor"></i>
            Hỗ trợ
        </a>
        <ul class="nav-dropdown-items">
            @if(auth()->guard('web')->user()->hasPermission('view-support-service-passenger'))
                <li class="nav-item {{ Request::is('supportServicePassengers*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('support_service_passengers.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Hành khách</span>
                    </a>
                </li>
            @endif
            @if(auth()->guard('web')->user()->hasPermission('view-support-service-driver'))
                <li class="nav-item {{ Request::is('supportServiceDrivers*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('support_service_drivers.index', [], false) }}">
                        <i class="nav-icon"></i>
                        <span>Tài xế</span>
                    </a>
                </li>
            @endif
        </ul>
    </li>
@endif
@if(auth()->guard('web')->user()->hasPermission('view-notification'))
    <li class="nav-item {{ Request::is('notifications*') ? 'active' : '' }}">
        <a class="nav-link" href="{{ route('notifications.index', [], false) }}">
            <i class="nav-icon icon-cursor"></i>
            <span>Quản lý thông báo</span>
        </a>
    </li>
@endif
