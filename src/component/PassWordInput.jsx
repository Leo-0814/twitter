import { Form, Input } from "antd"
import { styled } from "styled-components"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const StyledContainer = styled.div`
  margin-top: 30px;
`

const PassWordInput = ({name, placeholder, label, onChange, rules, dependencies}) => {

    return (
      <StyledContainer>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          dependencies={dependencies}
        >
          <Input.Password
            placeholder={placeholder || ''} 
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(e) => onChange?.(e.target.value)}
          />
        </Form.Item>
      </StyledContainer>
    )
}

export default PassWordInput