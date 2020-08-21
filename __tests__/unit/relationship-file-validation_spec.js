const fileValidator = require("../../controllers/file-validation");

describe('To assert the datas present in the relationship file', () => {

    beforeAll(async () => {
        userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv','testData/users-output-file.csv');

        // let file = {
        //     positive : [
        //         {
        //             inputfile: '',
        //             outputfile: ''
        //         }
        //     ],
        //     negative : [
        //         {
        //             inputfile: '',
        //             outputfile: ''
        //         }
        //     ]
        // }

        relationshipInfo = await fileValidator.dataInfo('testData/relationship-input-file.csv','testData/relationship-output-file.csv');
    });

    it('Verify whether the parent_integration_id is displayed based on the value present in Integration_Id column of Users.txt file.', () => {
        let parent_IID_status = false;
        relationshipInfo.inputData.records.map(function(current_record, index) {
            userInfo.userIntegrationData.map(function(current_field) {
                if(current_record.parent_integration_id === current_field.original_integration_id) {
                    try {
                        expect(current_field.masked_integration_id).toBe(relationshipInfo.outputData.records[index].parent_integration_id);
                    } catch (err) {
                        parent_IID_status = true
                        console.error(relationshipInfo.outputData.records[index].parent_integration_id, ' should be anonymized as - ', current_field.masked_integration_id)
                    }
                }
            })
        })   
        if(parent_IID_status){
            expect(parent_IID_status).not.toBe(true);
        }     
    })

    // it('Verify whether the User_Integration_Id value is not anonymized in the output file, when the user_integration_id column has some random value on the input Relationship.txt file', () => {
    //     let parent_IID_status = false;
    //     relationshipInfo.inputData.records.map(function(input_record, index) {
    //         userInfo.userIntegrationData.map(function(user_data_fields) {
    //             console.log(input_record.parent_integration_id)
    //             console.log(user_data_fields.original_integration_id)
    //             if(input_record.parent_integration_id !== user_data_fields.original_integration_id) {

    //                 expect(input_record.parent_integration_id).toBe(relationshipInfo.outputData.records[index].parent_integration_id);
    //                 // try {
    //                 //     expect(input_record.parent_integration_id).toBe(relationshipInfo.outputData.records[index].parent_integration_id);
    //                 // } catch (err) {
    //                 //     parent_IID_status = true
    //                 //     console.error(relationshipInfo.inputData.records[index].parent_integration_id, ' should not be anonymized as - ', user_data_fields.masked_integration_id)
    //                 // }
    //             }
    //         })
    //     })   
    //     if(parent_IID_status){
    //         expect(parent_IID_status).not.toBe(true);
    //     }     
    // })
})

