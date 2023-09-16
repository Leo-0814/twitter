import { Form, Input } from "antd"
import { styled } from "styled-components"

const StyledContainer = styled.div`
  margin-top: 30px;
`

const BasicInput = ({ name, placeholder, label, onChange, readOnly, rules, dependencies, maxLength }) => {

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
              onChange={(e) => onChange?.(e.target.value)}
              readOnly
            />
          ) : (
            <Input
              placeholder={placeholder || ''} 
              onChange={(e) => onChange?.(e.target.value)}
              maxLength={maxLength}
            />
          )}
        </Form.Item>
      </StyledContainer>
    )
  }

export default BasicInput