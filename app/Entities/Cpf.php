<?php

namespace App\Entities;

class Cpf
{
  private $cpf;
  public function __construct(string $cpf)
  {
    $cpf = $this->removerCaracteresEspeciais($cpf);
    $this->cpf = $cpf;
  }

  public function __toString(): string
  {
    return $this->cpf;
  }

  private function removerCaracteresEspeciais(string $cpf): string
  {
    return preg_replace('/[^0-9]/', '', $cpf);
  }
}
