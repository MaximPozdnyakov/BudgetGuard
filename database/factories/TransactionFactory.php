<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Transaction::class, function (Faker $faker) {
    return [
        'moneyAmount' => $faker->randomFloat($nbMaxDecimals = 1, $min = 0, $max = 10000),
        'moneySign'  => $faker->randomElement($array = array(true, false)),
        'category' => $faker->word,
        'spent_at' => $faker->dateTime(),
        'description' => $faker->sentence($nbWords = 6)
    ];
});