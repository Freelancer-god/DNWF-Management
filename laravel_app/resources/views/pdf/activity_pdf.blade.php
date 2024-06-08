<!DOCTYPE html>
<html>
<head>
    <title>Quá Trình Sinh Hoạt Hội Viên</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
<h1>Quá Trình Sinh Hoạt Hội Viên</h1>
<p><strong>Họ và tên:</strong> {{ $member['name'] }}</p>
<p><strong>Mã hội viên:</strong> {{ $member['membership_id'] }}</p>
<h2>Hoạt Động</h2>
<table>
    <thead>
    <tr>
        <th>Ngày</th>
        <th>Hoạt Động</th>
    </tr>
    </thead>
    <tbody>
    @foreach($member['activities'] as $activity)
        <tr>
            <td>{{ $activity['date'] }}</td>
            <td>{{ $activity['activity'] }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
