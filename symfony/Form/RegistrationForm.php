<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class RegistrationForm extends AbstractType
{
    public const USER_IDENTIFIER = "email"; // change if you use another unique userIdentifier for your user class
    public const PASSWORD_MIN_SIZE = 8; // no less than 8 chars, plz

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            // uncomment if you need to save the username or use it as the $userIdentifier
            /*
            ->add(self::USER_IDENTIFIER, TextType::class, [
                'required' => true,
                'empty_data' => "",
                'constraints' => [
                    new NotBlank(),
                    new Length([
                        'min' => 4,
                        'max' => 16
                    ]),
                    new Regex(['pattern' => "/^([A-Za-z_]{1,})$/"]),
                ],
            ]) 
            */
            ->add(self::USER_IDENTIFIER, RepeatedType::class, [
                'type' => EmailType::class,
                'empty_data' => "",
                'constraints' => [new NotBlank()],
                'attr' => [
                    'autofocus' => true
                ]
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'constraints' => [
                    new Regex(['pattern' => "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{4,}$/"]),
                    new Length(['min' => self::PASSWORD_MIN_SIZE])
                ],
            ])
            ->add('gdpr', CheckboxType::class, [
                'required' => true,
                'mapped' => false,
                'label' => false,
                'constraints' => [
                    new IsTrue()
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'constraints' => [
                new UniqueEntity([
                    'entityClass' => User::class,
                    'fields' => self::USER_IDENTIFIER,
                ]),
                /*
                new UniqueEntity([
                    'entityClass' => User::class,
                    'fields' => "other_unique_property",
                ]), 
                */
            ],
        ]);
    }
}
