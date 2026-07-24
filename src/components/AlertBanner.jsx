import { mdiInformation, mdiClose, mdiAlert, mdiChevronRight } from '@mdi/js';
import { CCard, CCardTitle, CCardContent, CIcon, CButton, CSelect } from '@cscfi/csc-ui-react';

const ALERT_STYLES = {
  warning: { bg: 'bg-orange-200', icon: mdiAlert },
  error: { bg: 'bg-red-200', icon: mdiClose },
  info: { bg: 'bg-sky-200', icon: mdiInformation },
};

export const AlertBanner = ({ type, text, link }) => {
  const { bg, icon } = ALERT_STYLES[type?.toLowerCase()] ?? ALERT_STYLES.info;
  const content = (
    <>
      <CIcon key={icon} path={icon} />
      <p className='text-[16px]'>
        {type ? text : 'Loading...'}
      </p>
      {link ? <CIcon path={mdiChevronRight} className='ml-auto' /> : null}
    </>
  );

  if (link) {
    return (
      <a href={link} className={`flex flex-row gap-4 w-full p-3 rounded-md ${bg} items-start sm:items-center cursor-pointer hover:shadow-md hover:opacity-90 transition-all`}>
        {content}
      </a>
    );
  }

  return (
    <div className={`flex flex-row gap-4 w-full p-3 rounded-md ${bg} items-start sm:items-center`}>
      {content}
    </div>
  );
};