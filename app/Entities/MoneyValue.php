<?php

namespace App\Entities;

class MoneyValue
{
  private $value;
  public function __construct(string $value)
  {
    $value = $this->removerCaracteresEspeciais($value);
    $this->value = $value;
  }

  public function __toString(): string
  {
    return $this->value;
  }

  private function removerCaracteresEspeciais(string $value): string
  {
    return number_format(str_replace(",", ".", str_replace(".", "",  explode('R$', $value)[1])), 2, '.', '');
  }
}
