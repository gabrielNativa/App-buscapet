<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReelComment extends Model
{
    use HasFactory;

    protected $table = 'reel_comments';
    protected $primaryKey = 'idReelComment';

    protected $fillable = [
        'idReels',
        'idUser',
        'comentario',
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