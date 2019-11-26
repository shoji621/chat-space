require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

  # ログインしているかつ、保存に成功した場合
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      # メッセージの保存はできたのか
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      # メッセージの保存はできたのか
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      # 意図した画面に遷移しているか
      it 'redners index' do
        expect(response).to render_template :index
      end
    end

    # ログインしていない場合
    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      # 意図した画面にリダイレクトできているか
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end