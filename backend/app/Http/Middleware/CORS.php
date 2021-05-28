<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        header('Acce-Control-Allow-Origin*');
        header('Acces-Control-Allow-Headers : Content-type, X-Auth-token, Authorization, Origin');
        return $next($request);
    }
}
