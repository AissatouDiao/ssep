<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Responsable_recommandation extends Notification
{
    use Queueable;
 
private $recommandation;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($recommandation)
    {
        $this->recommandation=$recommandation;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'data'=>'Vous avez été assigné(e) comme responsable de recommandation '.$this->recommandation->titre.',
             dont l\'exécution doit être faite entre '.$this->recommandation->date_debut.' et '.$this->recommandation->date_finale.'.'
        ];
    }
}
