import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
  email: yup.string().email().required('Preencha o email corretamente'),
  password: yup.string().min(8).max(32).required('Insira uma senha válida'),
});
