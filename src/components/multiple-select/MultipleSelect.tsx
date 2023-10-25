import { Select, Tag } from 'antd'
import React, { FC, useState } from 'react'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import styles from './multiple-select.module.scss'
// import Icon from '../icon/icon'

const { Option } = Select

const MultipleSelect: FC = () => {
  const [formatOption, setFormatOption] = useState<
    {
      value: string
      label: string
    }[]
  >([])

  const options = [
    { value: 'gold', label: 'gold' },
    { value: 'lime', label: 'lime' },
    { value: 'green', label: 'green' },
    { value: 'cyan', label: 'cyan' }
  ]

  const handleSearch = (value: string) => {
    const res = options.map(item => {
      item.label = item.label + Math.ceil(Math.random() * 100) + value
      return item
    })
    setFormatOption([])
    setTimeout(() => {
      setFormatOption(res)
    }, 1000)
  }

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    )
  }
  return (
    <Select
      showSearch
      mode="multiple"
      tagRender={data => tagRender(data)}
      // defaultValue={['gold', 'cyan']}
      style={{ width: '100%' }}
      onSearch={value => handleSearch(value)}
      filterOption={false}
      // options={formatOption}
    >
      {formatOption.map(item => {
        return (
          <Option key={item.label} value={item.value} label={item.label} title={item.label}>
            <div className={`${styles['option-item']}`}>
              <div className={`${styles['feature-name']}`}>{item.label}</div>
              <div className={`${styles['creator']}`}>小明</div>
            </div>
          </Option>
        )
      })}
    </Select>
  )
}

export default MultipleSelect
