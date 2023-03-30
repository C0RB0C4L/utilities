<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LoginForm extends AbstractType
{
    public const AUTHENTICATOR = "email"; // change this value if you use a different $userIdentifier in your security routine
    public const PASSWORD = "password";
    public const CSRF_TOKEN_ID = "authenticate_login";

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add(self::AUTHENTICATOR, EmailType::class, [
                'data' => $options['last_username'],
                'attr' => [
                    'autofocus' => true
                ]
            ])
            // uncomment this if you user the username instead
            /*
            ->add(self::AUTHENTICATOR, TextType::class, [
                'data' => $options['last_username'],
                'attr' => [
                'autofocus' => true
                ]
            ]) 
            */
            ->add(self::PASSWORD, PasswordType::class, []);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'csrf_field_name' => '_csrf_token',
            'csrf_token_id'   => self::CSRF_TOKEN_ID, // arbitrary string used to generate the token (adds a hash)
            'last_username' => ""
        ]);
    }

    public function getBlockPrefix()
    {
        return ''; // removes the [form_name] prefix from the <inputs> name attribute
        $string = 'bcazrj  $ {\'ezrzA//AAAkr  \\t zer-zerr __abcâèèèè';
            $one = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_\ ] remove; " " > "_" ;lower()', $string);
            dump($one);
            die;
    }
}
