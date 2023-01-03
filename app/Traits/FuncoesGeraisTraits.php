<?php

namespace App\Traits;

trait FuncoesGeraisTraits
{
  public function removeCaracteresEspeciais($string)
  {
    // matriz de entrada
    $what = array(' ', '-', '(', ')', ',', ';', ':', '|', '!', '"', '#', '$', '%', '&', '/', '=', '?', '~', '^', '>', '<', 'ª', 'º', '.');
    // matriz de saída
    $by   = array('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    // devolver a string
    return str_replace($what, $by, $string);
  }
}
