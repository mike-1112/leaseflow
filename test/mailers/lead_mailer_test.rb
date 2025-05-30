require "test_helper"

class LeadMailerTest < ActionMailer::TestCase
  include Rails.application.routes.url_helpers

  test "thank_you_email renders correctly" do
    lead = Lead.new(
      full_name: "Jane Doe",
      email:     "jane@example.com",
      property:  "456 Elm St"
    )

    # Clear any previous deliveries
    ActionMailer::Base.deliveries.clear

    # Deliver the email
    email = LeadMailer.with(lead: lead).thank_you_email.deliver_now

    # There should be exactly one delivery
    assert_equal 1, ActionMailer::Base.deliveries.size

    # Grab the actual mail object
    mail = ActionMailer::Base.deliveries.first

    # Check headers
    assert_equal ["jane@example.com"], mail.to
    assert_match /Thanks for inspecting 456 Elm St/, mail.subject

    # Check the HTML body contains our “Complete Your Application” link
    assert_includes mail.html_part.body.to_s, "Complete Your Application"

    # And that the URL helper generated link is present
    expected_url = signed_up_url(property: lead.property)
    assert_includes mail.html_part.body.to_s, expected_url
  end
end
