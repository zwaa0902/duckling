import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export function onSuccessNotification(message: any) {
  notification.info({
    className: 'abs-notification abs-notification__success',
    icon: <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#ffffff' }} width={13} height={13} />,
    message: <div className='body-1'>{message}</div>,
  });
}

export function onFailureNotification(message: any) {
  notification.error({
    className: 'abs-notification abs-notification__error',
    icon: <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#ffffff' }} width={13} height={13} />,
    message: <div className='body-1'>{message}</div>,
  });
}
