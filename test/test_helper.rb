ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"

# Make URL helpers and default host available in tests
Rails.application.routes.default_url_options = { host: "localhost", port: 3000 }
ActionMailer::Base.default_url_options    = { host: "localhost", port: 3000 }

class ActiveSupport::TestCase
  # Run tests in parallel with as many processors as you have
  parallelize(workers: :number_of_processors)

  # Add more helper methods to be used by all tests here...
end
