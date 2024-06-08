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
<p><strong>Họ và tên:</strong> {{ $member['full_name'] }}</p>
<p><strong>Mã hội viên:</strong> {{ $member['reference'] }}</p>
<h2>Hoạt Động</h2>
<table>
    <thead>
    <tr>
        <th>Tên</th>
        <th>Kết quả</th>
    </tr>
    </thead>
    <tbody>
    @foreach($member['activity_records'] as $activity)
        <tr>
            <td>{{ $activity['name'] }}</td>
            <td>{{ $activity['result'] }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
