json.id            @message.id
json.content       @message.content
json.image         @message.image.url
json.user_nickname @message.user.nickname
json.date          @message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
