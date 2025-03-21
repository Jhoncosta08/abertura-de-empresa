export interface EnderecoInterface {
  co_cep: number;
  ds_logradouro: string;
  co_numero: string;
  ds_complemento: string | null;
  ds_bairro: string;
  ds_municipio: string;
  ds_uf: string;
}
