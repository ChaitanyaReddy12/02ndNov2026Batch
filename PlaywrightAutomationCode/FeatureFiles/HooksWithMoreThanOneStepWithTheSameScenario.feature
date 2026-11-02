Feature:Hooks With More Than One Step With The Same Scenario

    @method1
    Scenario: Verify Playwright Frames1
        Then I verify playwright frames in hooks
        Then I verify playwright frames in hooks


# BeforeAll
# Before
# BeforeStep
# allFramesCount is : 6
# bottomText1stWay is : BOTTOM
# bottomText2ndWay is : BOTTOM
# scenario frames executed
# AfterStep
#  BeforeStep
# allFramesCount is : 6
# bottomText1stWay is : BOTTOM
# bottomText2ndWay is : BOTTOM
# scenario frames executed
# AfterStep
# after
# afterAll

