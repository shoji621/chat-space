json.array! @messages do |message|
  json.content       message.content
  json.image         message.image.url
  json.date          message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
  json.user_nickname message.user.nickname
  json.id            message.id
end