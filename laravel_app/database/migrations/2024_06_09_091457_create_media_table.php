<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('type'); // Loại truyền thông (ví dụ: bài viết, video, hình ảnh)
            $table->dateTime('editing_date')->nullable(); // Ngày biên tập
            $table->string('editor')->nullable(); // Người thực hiện biên tập
            $table->integer('channel')->nullable(); // Kênh truyền thông
            $table->dateTime('publish_date')->nullable(); // Ngày đăng
            $table->string('note')->nullable(); // Ghi chú
            $table->integer('status')->default(0); // Trạng thái (mặc định là nháp)
            $table->string('attachment')->nullable(); // Đính kèm tệp tin
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
