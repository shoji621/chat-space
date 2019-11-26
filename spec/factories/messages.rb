FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/pictures/test.jpg")}
    user
    group
  end
end