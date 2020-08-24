const fileValidator = require("../../controllers/file-validation");
let userInfo, relationshipInfo, inputRecords, outputRecords;

describe('To assert the datas present in the relationship file', () => {

    beforeAll(async () => {
        userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv', 'testData/users-output-file.csv');
        relationshipInfo = await fileValidator.dataInfo('testData/relationship-input-file.csv', 'testData/relationship-output-file.csv');
        inputRecords = relationshipInfo.inputData.records;
        outputRecords = relationshipInfo.outputData.records;
    });

    it('Verify whether the parent_integration_id is displayed based on the value present in Integration_Id column of Users.txt file.', () => {
        let parent_IID_status = true;
        inputRecords.map(function (current_record, index) {
            userInfo.userIntegrationData.map(function (current_field) {
                if (current_record.parent_integration_id === current_field.original_integration_id) {
                    try {
                        expect(outputRecords[index].parent_integration_id).toBe(current_field.masked_integration_id);
                    } catch (err) {
                        parent_IID_status = false
                        console.error(current_record.parent_integration_id, ' should be anonymized as - ', current_field.masked_integration_id)
                    }
                }
            })
        })
        expect(parent_IID_status).toBe(true);
    })

    it('Verify whether the User_Integration_Id value is not anonymized in the output file, when the user_integration_id column has some random value on the input Relationship.txt file', () => {
        let parent_IID_status = true;
        inputRecords.map(function (current_record, index) {
            var check_record = userInfo.userIntegrationData.filter(record => (record.original_integration_id === current_record.parent_integration_id));
            if (!check_record.length) {
                try {
                    expect(outputRecords[index].parent_integration_id).toBe(current_record.parent_integration_id);
                } catch (err) {
                    parent_IID_status = false;
                    console.error(current_record.parent_integration_id + ' parent integration id should not be anonymized.')
                }
            }
        })
        expect(parent_IID_status).toBe(true);
    })

    it('Verify whether the child_id is displayed based on the value present in Integration_Id column of Users.txt file.', () => {
        let parent_IID_status = true;
        inputRecords.map(function (current_record, index) {
            userInfo.userIntegrationData.map(function (current_field) {
                if (current_record.child_id === current_field.original_integration_id) {
                    try {
                        expect(outputRecords[index].child_id).toBe(current_field.masked_integration_id);
                    } catch (err) {
                        parent_IID_status = false
                        console.error(current_record.child_id, ' should be anonymized as - ', current_field.masked_integration_id)
                    }
                }
            })
        })
        expect(parent_IID_status).toBe(true);
    })

    it('Verify whether the Child_Id value is not anonymized in the output file when the user_integration_id column has some random value on the input Relationship.txt file', () => {
        let parent_IID_status = true;
        inputRecords.map(function (current_record, index) {
            var check_record = userInfo.userIntegrationData.filter(record => (record.original_integration_id === current_record.child_id));
            if (!check_record.length) {
                try {
                    expect(inputRecords[index].child_id).toBe(current_record.child_id);
                } catch (err) {
                    parent_IID_status = false;
                    console.error(current_record.child_id + ' child id should not be anonymized.')
                }
            }
        })
        expect(parent_IID_status).toBe(true);
    })

    it('Verify whether the Child_Id value is not anonymized in the output file when the user_integration_id column has some random value on the input Relationship.txt file', () => {
        let parent_IID_status = true;
        inputRecords.map(function (current_record, index) {
            var check_record = userInfo.userIntegrationData.filter(record => (record.original_integration_id === current_record.child_id));
            if (!check_record.length) {
                try {
                    expect(inputRecords[index].child_id).toBe(current_record.child_id);
                } catch (err) {
                    parent_IID_status = false;
                    console.error(current_record.child_id + ' child id should not be anonymized.')
                }
            }
        })
        expect(parent_IID_status).toBe(true);
    })

    it('Verify whether the parent_role,child_role, and term_id column values are being correctly shown as per input file without anonymization.', () => {
        const dataFeilds = fileValidator.getRelationshipInfo().non_anonymize_fields;
        let relationshipField_status = true;
        inputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                try {
                    current_record[current_field] === '' ? expect(outputRecords[index][current_field]).toBe('') : expect(current_record[current_field]).toBe(outputRecords[index][current_field]);
                } catch {
                    relationshipField_status = false;
                    console.error('"' + current_record[current_field] + '" for the field [' + current_field + '] should not be "' + outputRecords[index][current_field] + '"')
                }
            })
        })
        expect(relationshipField_status).toBe(true);
    })

    /** Generic Validations **/
    it('Verify whether the actual records from input file are correctly spooled in the output File', () => {
        let dataFeilds = fileValidator.getRelationshipInfo().anonymize_fields.concat(fileValidator.getRelationshipInfo().non_anonymize_fields)
        expect(relationshipInfo.outputData.header[0]).toEqual(relationshipInfo.inputData.header[0]);
        outputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                if (current_record[current_field] === '') {
                    expect(current_record[current_field]).toBe('')
                } else if (current_field === 'parent_integration_id') {
                    inputRecords.map(function (current_record, index) {
                        userInfo.userIntegrationData.map(function (current_field) {
                            if (current_record.parent_integration_id === current_field.original_integration_id) {
                                expect(outputRecords[index].parent_integration_id).toBe(current_field.masked_integration_id);
                            }
                        })
                    })
                } else if (current_field === 'child_id') {
                    inputRecords.map(function (current_record, index) {
                        userInfo.userIntegrationData.map(function (current_field) {
                            if (current_record.child_id === current_field.original_integration_id) {
                                expect(outputRecords[index].child_id).toBe(current_field.masked_integration_id);
                            }
                        })
                    })
                } else {
                    expect(current_record[current_field]).toBe(inputRecords[index][current_field]);
                }
            })
        })
    })

    it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
        expect(relationshipInfo.outputData.header[0].length).toEqual(relationshipInfo.inputData.header[0].length);
        expect(outputRecords.length).toEqual(inputRecords.length);
    })

    it('Verify whether the Headers are correctly displayed in the output file.', () => {
        expect(relationshipInfo.outputData.header[0]).toEqual(relationshipInfo.inputData.header[0]);
    })

    it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
        let userFields = fileValidator.getRelationshipInfo().non_anonymize_fields
        userFields.map(function (current_record) {
            if (inputRecords.current_record === '') {
                expect(inputRecords.current_record).toBe('')
            }
        })
    })

    it('Verify that the file column with numeric value is correctly shown based on the numeric value present in the input file.', () => {
        const dataFeilds = fileValidator.getRelationshipInfo().non_anonymize_fields;
        outputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                current_record[current_field] === '' ?
                    expect(current_record[current_field]).toBe('') :
                    expect(current_record[current_field]).toBe(outputRecords[index][current_field]);
            })
        })
    })

})

