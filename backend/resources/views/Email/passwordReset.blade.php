@component('mail::message')
# Requête changement de mot de passe.

Cliquez sur le bouton ci-dessous pour changer le mot de passe.

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='.$token->token ])
Changer mon mot de passe
@endcomponent

Bien à vous,<br>
{{ config('app.name') }}
@endcomponent
