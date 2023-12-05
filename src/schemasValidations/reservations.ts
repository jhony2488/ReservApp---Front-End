import * as yup from 'yup';

export const schemaReservation = yup.object().shape({
  date: yup.string().required('Insira uma data'),
  hour: yup.string().required('Insira uma hora'),
  numberPeoples: yup.number().required('Insira o número de pessoA para a reserva'),
  inputNameContact:  yup.string().required('Insira um nome para contato'),
  inputContact: yup.string().required('Insira um número de telefone para contato'),
});
