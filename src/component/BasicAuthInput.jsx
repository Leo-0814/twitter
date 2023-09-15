import { Form, Input } from "antd"
import { styled } from "styled-components"

const StyledContainer = styled.div`
  margin-top: 30px;
`

const BasicAuthInput = ({name, value, placeholder, label, onChange, readOnly, rules, dependencies}) => {

    return (
      <StyledContainer>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          dependencies={dependencies}
        >
          {readOnly? (
            <Input
              placeholder={placeholder || ''} 
              value={value} 
              onChange={(e) => onChange?.(e.target.value)}
              readOnly
            />
          ) : (
            <Input
              placeholder={placeholder || ''} 
              value={value} 
              onChange={(e) => onChange?.(e.target.value)}
            />
          )}
        </Form.Item>
      </StyledContainer>
    )
  }

export default BasicAuthInput