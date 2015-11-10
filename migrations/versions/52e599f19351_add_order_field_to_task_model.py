"""add `order` field to Task model

Revision ID: 52e599f19351
Revises: 547713c4d506
Create Date: 2015-11-10 14:15:06.393978

"""

# revision identifiers, used by Alembic.
revision = '52e599f19351'
down_revision = '547713c4d506'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('task', sa.Column('order', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('task', 'order')
    ### end Alembic commands ###
