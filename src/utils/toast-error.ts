import {toast, TypeOptions} from 'react-toastify';

// As many components can trigger error, and we are not sure if all of them throws 'Error'
// we use 'any' and then filter
export function toastError(error: any, type?: TypeOptions) {
  let message: string = 'Erro desconhecido';
  if (error) {
    if (error.response?.data?.userMessage) message = error.response.data.userMessage;
    else if (error.response?.data?.message) message = error.response.data.message;
    else if (error.userMessage) message = error.userMessage;
    else if (error.message) message = error.message;
    else if (typeof error === 'string') message = error;
  }
  toast(message, {type: type ?? 'error'});
}
