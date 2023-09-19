import { Form, Input } from "antd"

const BasicInput = ({ name, placeholder, label, onChange, readOnly, rules, dependencies, maxLength }) => {

    return (
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
    )
  }

export default BasicInput