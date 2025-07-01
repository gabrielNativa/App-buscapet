<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReelLike extends Model
{
    use HasFactory;

    protected $table = 'reel_likes';
    protected $primaryKey = 'idReelLike';

    protected $fillable = [
        'idReels',
        'idUser'
    ];

    public function reel()
    {
        return $this->belongsTo(Reel::class, 'idReels', 'idReels');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser', 'idUser');
    }
} 