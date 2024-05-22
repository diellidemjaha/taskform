<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Task extends Model
{
    use HasFactory;

    protected $guard_name = 'web';
    protected $fillable = [
        'title',
        'description',
        'has_task',
        'categories',
        'start_date',
        'end_date',
        'admin_id',
        'status',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function categories()
    {
        return $this->belongsToMany(TasksCategory::class, 'task_categories');
    }
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
