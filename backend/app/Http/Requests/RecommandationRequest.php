<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecommandationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'titre'=>'required',
            'recommandation.*'=>'required|file|mimes:docx,pdf|max:2048',
            'date_finale'=>'required',
            'statut'=>'required'
        ];
    }
}
