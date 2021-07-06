class User < ApplicationRecord
  has_many :trackers, dependent: :destroy

  has_secure_password

  validates :first_name, presence: true, length: {minimum: 2}
  validates :last_name, presence: true, length: {minimum: 2}
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }, length: {minimum: 6}
end
