@component('mail::message')
# Bienvenue {{ $user->surname }} {{ $user->name}}.

Vous venez d'être inscrit dans la plateforme de suivi et d'évaluation du PDZP. 
Veuillez cliquer sur le bouton ci-dessous pour finaliser, en définissant votre mot de passe.

@component('mail::button', ['url' => 'http://localhost:4200/user-add-password?token='.$token ])
Définir mon mot de passe.
@endcomponent

Bien à vous,<br>
{{ config('app.name') }}
@endcomponent
