import { Input } from 'antd';

const inputStyle: React.CSSProperties = {
  padding: '19.5px 16px',
  background: '#F6FAFC',
};

const MaskInput: React.FC = (props) => {
  return (
    <Input
      type="tel"
      style={inputStyle}
      {...props}
    />
  );
};

export default MaskInput;
