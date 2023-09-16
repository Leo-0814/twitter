import { Form, Input } from "antd"
import { styled } from "styled-components"

const StyledContainer = styled.div`
  margin-top: 30px;
`

const TextAreaInput = ({ name, placeholder, label, onChange, rules, dependencies, maxLength, showCount, cols, rows }) => {

    return (
      <StyledContainer>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          dependencies={dependencies}
        >
          <Input.TextArea 
            showCount={showCount}
            maxLength={maxLength} 
            placeholder={placeholder || ''} 
            cols={cols}
            rows={rows}
            onChange={(e) => onChange?.(e.target.value)} 
          />
        </Form.Item>
      </StyledContainer>
    )
}

export default TextAreaInput