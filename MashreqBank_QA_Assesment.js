let myApp = 'https://www.mashreqbank.com/uae/en/personal/home'
let myApp1 = 'https://www.mashreqbank.com/uae/en/personal/contactus'

describe('Mashreq Bank Website Testing', function () {
  context('Home Page', function () {
    beforeEach(function () {
      // Test run for  desktop
      // browser with a 800p monitor
      cy.viewport(1280, 800)
     
    })

    // The navigation bar is visible on desktop devices and
    // display 9 items: Corporate, Business, International etc.
    it('Displays Navigation header', function () {
      cy.visit(myApp)
      cy.get('nav').should('be.visible')    
    })
    
    it('Displays Menu items', function () {
      cy.visit(myApp)
                cy.contains('Personal') 
                cy.contains('Corporate')
                cy.contains('International')
                cy.contains('Private Banking')
                cy.contains('Al Islami')
                cy.contains('Gold')
                cy.contains('Mashreq Securities')
                cy.contains('Mashreq Capital')
                cy.contains('Mashreq Global Services')
                cy.contains('Apply')
                cy.contains('Search')
                cy.contains('Contact')
                 })

//-	A link for “Contact Us” is displayed on the homepage and Clicking this link  
//  takes you to the contact form page

    it('Link to Contact us page', function () {
                cy.get('nav').contains('Contact').click()          
                cy.url().should( 'include', '/contact' )

                })

//	Submitting the form without entering any details indicates an error message and specifies the mandatory fields
// that are required to be given 

  context('Contact Us Page', function () {
     it('Negative case', function () {
               
      cy.contains('Submit').scrollIntoView().click()
      cy.log("Error!! Enter the fields to continue..")
      
      cy.get('[name="reachoutforproduct"]').contains('I am looking to...')
      cy.log(" I am looking to...field is empty")
      
      cy.get('[name="compInqServ"]').contains('Complaint/Inquiry/Service Type')
      cy.log("Complaint/Inquiry/Service Type field is empty")

      cy.get('[name="need"]').contains('Select Product')
      cy.log("Select Product field is empty")

      cy.get('[name="product"]').contains('Select Sub Product')
      cy.log("Select Sub Product field is empty")

      cy.get('[name="emirate"]').contains('Select Emirate')
      cy.log("Select Emirate field is empty")

      cy.get('[name="branch"]').contains('Select Branch')
      cy.log("Select Branch field is empty")
     
      cy.get('#firstName').should('be.empty')
      cy.log("First Name field is empty")

      cy.get('#email').should('be.empty')
      cy.log(" Email feild is empty")

      cy.get('[id="mob1"]').contains('050')
      cy.log("Select Mobile Code field is empty")

      cy.get('#mobile').should('be.empty')
      cy.log(" Mobile feild is empty")
                  })


 // Counts the number of elements in "I am looking for" dropdown

      it('Count the elements in Dropdown', function () {
              cy.get('[name="reachoutforproduct"]').find('option')
              .should(($option) => {                
               expect($option).to.have.length(5) 
               expect($option.eq(0)).to.contain('I am looking to...')
               expect($option.eq(1)).to.contain('Register a complaint')
               expect($option.eq(2)).to.contain('Enquire about a product')
               expect($option.eq(3)).to.contain('Raise a service request')
               expect($option.eq(4)).to.contain('Apply for a new product')
              
        })
     
      })

 // Ensures that "Select Sub Product" field is empty initially

      it('Select Sub Product - should be empty intially', function () {
        cy.visit(myApp1)            
        cy.get('[name="product"]').find('option')
          .then(($option) => {
              expect($option).to.have.length(1) 
              expect($option.eq(0)).to.contain('Select Sub Product') 
        cy.log("Select Sub Product is empty")
            })
})

// Selecting the Product “Loans” from the dropdown populates the “Select Sub Product” dropdown with 6 options including “Home Loan UAE Resident”

it('Populating Loans and Sub Products', function () {

  cy.visit(myApp1)
  cy.get('[name="need"]').select('Loans')
  cy.log('Success')
  cy.get('[name="product"]').find('option')
        .should(($option) => {                
         expect($option).to.have.length(7)
         expect($option.eq(1)).to.contain('Auto Loan')
         expect($option.eq(2)).to.contain('Home Loan Non-UAE Resident')
         expect($option.eq(3)).to.contain('Home Loan UAE Resident')
         expect($option.eq(4)).to.contain('Personal Loan For Emiratis')
         expect($option.eq(5)).to.contain('Personal Loan for Expats')
         expect($option.eq(6)).to.contain('Commercial Mortgage Loans UAE Residents')

        })

})         
it('Validation on Mobile number', function () {

  cy.visit(myApp1)
  cy.get('[name="mobile"]')
 .type('1234567').should('be.gt','999999') 
})
  })
})
})