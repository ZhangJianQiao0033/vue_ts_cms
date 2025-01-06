const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      'label': "部门名称",
      'placeHolder': '请输入查询的部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      'label': "部门领导",
      'placeHolder': '请输入查询的领导名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      'label': "创建时间",
      'placeHolder': '请输入查询的时间'
    }
  ]
}

export default searchConfig
