const fileValidator = require("../../controllers/file-validation");
let userInfo, outputRecords;

describe('To assert the datas present in the users file', () => {

    beforeAll(async () => {
        userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv', 'testData/users-output-file.csv');
        outputRecords = userInfo.userData.outputData.records;
        inputRecords = userInfo.userData.inputData.records;
    });

    it('Verify whether the integration_id is displayed in sequential order for all the rows in the output file', () => {
        let integration_id_status = true;
        outputRecords.map(function (current_record, index) {
            try {
                expect(current_record.integration_id).toBe(userInfo.userIntegrationData[index].masked_integration_id);
            } catch (err) {
                integration_id_status = false;
                console.error(current_record.integration_id, ' - integration ID is not in a correct sequence. expected integration ID is ', userInfo.userIntegrationData[index].masked_integration_id)
            }
        })
        expect(integration_id_status).toBe(true);
    })

    it('Verify whether the family_name is displayed with "lname_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.family_name === '' ? expect(current_record.family_name).toBe('') : expect(current_record.family_name).toBe(fileValidator.getUserAnonymizeInfo().family_name);
        })
    })

    it('Verify whether the middle_name is displayed with "mname_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.middle_name === '' ? expect(current_record.middle_name).toBe('') : expect(current_record.middle_name).toBe(fileValidator.getUserAnonymizeInfo().middle_name);
        })
    })

    it('Verify whether the given_name is displayed with "fname_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.given_name === '' ? expect(current_record.given_name).toBe('') : expect(current_record.given_name).toBe(fileValidator.getUserAnonymizeInfo().given_name);
        })
    })

    it('Verify whether the email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.email === '' ? expect(current_record.email).toBe('') : expect(current_record.email).toBe(fileValidator.getUserAnonymizeInfo().email);
        })
    })

    it('Verify whether the secondary_email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.secondary_email === '' ? expect(current_record.secondary_email).toBe('') : expect(current_record.secondary_email).toBe(fileValidator.getUserAnonymizeInfo().secondary_email);
        })
    })

    it('Verify whether the student_id is displayed with "sid_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.student_id === '' ? expect(current_record.student_id).toBe('') : expect(current_record.student_id).toBe(fileValidator.getUserAnonymizeInfo().student_id);
        })
    })

    it('Verify whether the user_id is displayed with "u_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.user_id === '' ? expect(current_record.user_id).toBe('') : expect(current_record.user_id).toBe(fileValidator.getUserAnonymizeInfo().user_id);
        })
    })

    it('Verify whether the birth_dt value is populated based on the random date range', () => {
        let birth_dt_status = true;
        const minDate = fileValidator.getUserAnonymizeInfo().birth_dt.min_date,
            maxDate = fileValidator.getUserAnonymizeInfo().birth_dt.max_date;
        outputRecords.map(function (current_record, index) {
            try {
                current_record.birth_dt === '' ? expect(current_record.birth_dt).toBe('') : expect(fileValidator.verifyDateInRange(minDate, maxDate, current_record.birth_dt, inputRecords[index].birth_dt)).toBeTruthy();
            } catch (err) {
                birth_dt_status = false;
                console.error(current_record.birth_dt, ' birth date is not in the available range for the integration ID - ', current_record.integration_id)
            }
        })
        expect(birth_dt_status).toBe(true);
    })

    it('Verify whether the birth_dt value is displayed in the format yyyy-mm-dd', () => {
        let birth_dt_fmt_status = true;
        outputRecords.map(function (current_record) {
            try {
                current_record.birth_dt === '' ? expect(current_record.birth_dt).toBe('') : expect(fileValidator.verifyDateFormat(current_record.birth_dt)).toBeTruthy();
            } catch (err) {
                birth_dt_fmt_status = false;
                console.error(current_record.birth_dt, ' birth date value is not displayed in the format yyyy-mm-dd for the integration ID - ', current_record.integration_id)
            }
        })
        expect(birth_dt_fmt_status).toBe(true);
    })

    it('Verify whether the b_phone is displayed with "+17031234321" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.b_phone === '' ? expect(current_record.b_phone).toBe('') : expect(current_record.b_phone).toBe(fileValidator.getUserAnonymizeInfo().b_phone);
        })
    })

    it('Verify whether the m_phone is displayed with "+17031234321" for all the rows that are pertained to "Students".', () => {
        outputRecords.map(function (current_record) {
            current_record.m_phone === '' ? expect(current_record.m_phone).toBe('') : expect(current_record.m_phone).toBe(fileValidator.getUserAnonymizeInfo().m_phone);
        })
    })

    it('Verify whether the gender,available_ind,assign_student_role,allow_login, and user_timezone column values are being correctly shown as per input User.txt file without anonymization', () => {
        const dataFeilds = fileValidator.getUserAnonymizeInfo().non_anonymize_fields;
        outputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                current_record[current_field] === '' ? expect(current_record[current_field]).toBe('') : expect(current_record[current_field]).toBe(inputRecords[index][current_field]);
            })
        })
    })

    it('Verify whether the home_city is displayed with "home_city_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.home_city === '' ? expect(current_record.home_city).toBe('') : expect(current_record.home_city).toBe(fileValidator.getUserAnonymizeInfo().home_city);
        })
    })

    it('Verify whether the home_state is displayed with "home_state_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.home_state === '' ? expect(current_record.home_state).toBe('') : expect(current_record.home_state).toBe(fileValidator.getUserAnonymizeInfo().home_state);
        })
    })

    it('Verify whether the home_zip is displayed with "home_zip_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.home_zip === '' ? expect(current_record.home_zip).toBe('') : expect(current_record.home_zip).toBe(fileValidator.getUserAnonymizeInfo().home_zip);
        })
    })

    it('Verify whether the home_county is displayed with "home_county_1234" for all the rows.', () => {
        outputRecords.map(function (current_record) {
            current_record.home_county === '' ? expect(current_record.home_county).toBe('') : expect(current_record.home_county).toBe(fileValidator.getUserAnonymizeInfo().home_county);
        })
    })

    it('Verify whether the max character value is correctly shown when the columns middle_name, home_city, home_state, and home_county are entered with max characters', () => {
        const dataFeilds = fileValidator.getUserAnonymizeInfo().max_characters_fields;
        outputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                current_record[current_field] === '' ? expect(current_record[current_field]).toBe('') : expect(current_record[current_field]).toBe(fileValidator.getUserAnonymizeInfo()[current_field]);
            })
        })
    })

    it('Verify whether the actual records from input file are correctly spooled in the output File', () => {
        const dataFeilds = fileValidator.getUserAnonymizeInfo().anonymize_fields;
        expect(userInfo.userData.outputData.header[0]).toEqual(userInfo.userData.inputData.header[0]);
        outputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                current_record[current_field] === '' ?
                    expect(current_record[current_field]).toBe('') :
                    current_field === 'integration_id' ?
                        expect(current_record.integration_id).toBe(userInfo.userIntegrationData[index].masked_integration_id) :
                        current_field === 'birth_dt' ?
                            expect(fileValidator.verifyDateInRange(fileValidator.getUserAnonymizeInfo()[current_field].min_date, fileValidator.getUserAnonymizeInfo()[current_field].max_date, current_record[current_field], inputRecords[index][current_field])).toBeTruthy() :
                            expect(current_record[current_field]).toBe(fileValidator.getUserAnonymizeInfo()[current_field]);
            })
        })
    })

    it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
        expect(userInfo.userData.outputData.header[0].length).toEqual(userInfo.userData.inputData.header[0].length);
        expect(outputRecords.length).toEqual(inputRecords.length);
    })

    it('Verify whether the Headers are correctly displayed in the output file.', () => {
        expect(userInfo.userData.outputData.header[0]).toEqual(userInfo.userData.inputData.header[0]);
    })

    it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
        let userFields = fileValidator.getUserAnonymizeInfo().anonymize_fields.concat(fileValidator.getUserAnonymizeInfo().non_anonymize_fields)
        userFields.map(function (current_record) {
            if (inputRecords.current_record === '') {
                expect(inputRecords.current_record).toBe('')
            }
        })
    })

    it('Verify that the file column with numeric value is correctly shown based on the numeric value present in the input file.', () => {
        const dataFeilds = fileValidator.getUserAnonymizeInfo().non_anonymize_fields;
        outputRecords.map(function (current_record, index) {
            dataFeilds.map(function (current_field) {
                current_record[current_field] === '' ?
                    expect(current_record[current_field]).toBe('') :
                    expect(current_record[current_field]).toBe(outputRecords[index][current_field]);
            })
        })
    })

    it('Verify that the file column with date value is correctly shown based on the date value present in the input file.', () => {
        const minDate = fileValidator.getUserAnonymizeInfo().birth_dt.min_date,
            maxDate = fileValidator.getUserAnonymizeInfo().birth_dt.max_date;
        outputRecords.map(function (current_record, index) {
            current_record.birth_dt === '' ? expect(current_record.birth_dt).toBe('') : expect(fileValidator.verifyDateInRange(minDate, maxDate, current_record.birth_dt, inputRecords[index].birth_dt)).toBeTruthy();
        })
    })

})