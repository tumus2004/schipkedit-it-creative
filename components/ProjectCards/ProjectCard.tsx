interface Props {
  title: string;
  content: string;
}

export const ProjectCard = ({ title, content }: Props): JSX.Element => {
  return (
    <div id='feature' className='feature'>
      <div className='feature-content flex flex-col my-0 p-4'>
        <strong>{title}</strong>
        <div className='flex justify-between'>
          <span className='text-gray-300 opacity-75 text-xs'>{content}</span>
        </div>
      </div>
    </div>
  );
};
