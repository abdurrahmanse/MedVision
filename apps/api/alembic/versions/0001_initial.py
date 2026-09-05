"""initial

Revision ID: 0001
Revises: 
Create Date: 2026-09-05 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table('predictions',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('image_url', sa.String(), nullable=False),
        sa.Column('predicted_class', sa.String(), nullable=False),
        sa.Column('confidence', sa.Float(), nullable=False),
        sa.Column('model_version', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('predictions')
