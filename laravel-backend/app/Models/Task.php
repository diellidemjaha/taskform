<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;



class Task extends Model
{
    use HasFactory, HasRoles;

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
}
