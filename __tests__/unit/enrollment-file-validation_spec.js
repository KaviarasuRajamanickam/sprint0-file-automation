const fileValidator = require("../../controllers/file-validation");
let userInfo, enrollmentInfo, inputRecords, outputRecords;

describe('To assert the datas present in the enrollment file', () => {

    beforeAll(async () => {
        userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv', 'testData/users-output-file.csv');
        enrollmentInfo = await fileValidator.dataInfo('testData/enrollment-input-file.csv', 'testData/enrollment-output-file.csv');
        inputRecords = enrollmentInfo.inputData.records;
        outputRecords = enrollmentInfo.outputData.records;
    });

    it('Verify whether the user_integration_id is displayed based on the value present in Integration_Id column of Users.txt file.', () => {
        let user_IID_status = true;
        inputRecords.map(function (current_record, index) {
            userInfo.userIntegrationData.map(function (current_field) {
                if (current_record.user_integration_id === current_field.original_integration_id) {
                    try {
                        expect(outputRecords[index].user_integration_id).toBe(current_field.masked_integration_id);
                    } catch (err) {
                        user_IID_status = false
                        console.error(current_record.user_integration_id, ' should be anonymized as - ', current_field.masked_integration_id)
                    }
                }
            })
        })
        expect(user_IID_status).toBe(true);
    })

    it('Verify whether the User_Integration_Id value is not anonymized in the output file, when the user_integration_id column has some random value on the input Enrollment.txt file', () => {
        let parent_IID_status = true;
        inputRecords.map(function (current_record, index) {
            var check_record = userInfo.userIntegrationData.filter(record => (record.original_integration_id === current_record.user_integration_id));
            if (!check_record.length) {
                try {
                    expect(inputRecords[index].user_integration_id).toBe(current_record.user_integration_id);
                } catch (err) {
                    parent_IID_status = false;
                    console.error(current_record.user_integration_id + ' parent integration id should not be anonymized.')
                }
            }
        })
        expect(parent_IID_status).toBe(true);
    })

    it('Verify whether the User_Integration_Id value is not anonymized in the output file, when the user_integration_id column has some random value on the input Enrollment.txt file', () => {
        let parent_IID_status = true;
        inputRecords.map(function (current_record, index) {
            var check_record = userInfo.userIntegrationData.filter(record => (record.original_integration_id === current_record.user_integration_id));
            if (!check_record.length) {
                try {
                    expect(outputRecords[index].user_integration_id).toBe(current_record.user_integration_id);
                } catch (err) {
                    parent_IID_status = false;
                    console.error(current_record.user_integration_id + ' user integration id should not be anonymized.')
                }
            }
        })
        expect(parent_IID_status).toBe(true);
    })

    it('Verify whether the course_section_integration_id, user_role, available_ind, credit_hours, last_access_date, and authoritative_status column values are being correctly shown as per input file without anonymization', () => {
        const dataFeilds = fileValidator.getEnrollmentInfo().non_anonymize_fields;
        let enrollmentField_status = true;
        inputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                try {
                    current_record[current_field] === '' ? expect(outputRecords[index][current_field]).toBe('') : expect(current_record[current_field]).toBe(outputRecords[index][current_field]);
                } catch {
                    enrollmentField_status = false;
                    console.error('"' + current_record[current_field] + '" for the field [' + current_field + '] should not be "' + outputRecords[index][current_field] + '"')
                }
            })
        })
        expect(enrollmentField_status).toBe(true);
    })

})

